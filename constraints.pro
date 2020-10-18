constraints_min_version(1).

/*
 * Workspace Constraint Rules
 */

% This rule enforces that all dependency versions are pinned to exact semver
% ranges.
gen_enforced_dependency(Workspace, Dependency, DesiredVersion, Type) :-
  workspace_has_dependency(Workspace, Dependency, Version, Type),
  pin_version(DesiredVersion, Version).

/*
 * Semver Utility Rules
 * See https://gist.github.com/10xjs/c7e026e05c1005ccfe02d88aa1114fd0
 */

% True if Atom contains only numeric characters.
%
% numeric('10'). true
% numeric('x'). false
numeric(Atom) :-
  atom(Atom),
  atom_chars(Atom, Chars),
  catch(number_chars(_, Chars), _, false).

semver_tag_char('-').
semver_tag_char('+').

% True if Tags are a valid semver tag set and Atom is is the concatenation of
% Tags and Remain.
%
% semver_tags('-tag+build', 'remain', 'remain-tag+build'). true
semver_tags(Tags, Remain, Atom) :-
  atom_concat(Remain, Tags, Atom),
  (atom_concat(Prefix, _, Tags)), semver_tag_char(Prefix), !;
  Atom = Remain, Tags = ''.

semver_prefix_char('>').
semver_prefix_char('>=').
semver_prefix_char('<').
semver_prefix_char('<=').
semver_prefix_char('~').
semver_prefix_char('^').

% True if Prefix is a valid semver prefix and Atom is composed of Prefix and
% Remain.
%
% semver_prefix('^', 'remain', '^remain'). true
semver_prefix(Prefix, Remain, Atom) :-
  atom_concat(Prefix, Remain, Atom), semver_prefix_char(Prefix), !;
  Remain = Atom.

% True if Atom is a valid part of a semver version partial.
%
% semver_part('1'). true
% semver_part(''). false
semver_part(Atom) :- Atom \= ''.

% True if Parts is a list of valid semver version parts that join to form Atom.
semver_parts(Parts, Atom) :-
  atomic_list_concat(Parts, '.', Atom),
  maplist(semver_part, Parts).

% True if Major, Minor, and Patch are the parts of the semver version partial
%
% semver_partial('1', '2', '3', '1.2.3'). true
% semver_partial('1', '2', '', '1.2'). true
% semver_partial('1', '', '3', _). false
semver_partial(Major, Minor, Patch, Atom) :-
  semver_parts([Major, Minor, Patch], Atom), !;
  semver_parts([Major, Minor], Atom), !;
  semver_parts([Major], Atom).

% True if Prefix, Major, Minor, Patch, and Tags are the elements of the semver
% version range Atom.
%
% semver('^', '1', '2', '3', '-tag+build', '^1.2.3-tag+build''). true
% semver('', '1', '2', '3', '', '1.2.3'). true
% semver('', '1', 'x', '', '', '1.x'). true
% semver('', '*', '', '', '', '*'). true
semver(Prefix, Major, Minor, Patch, Tags, Atom) :-
  ( var(Atom) ->
    semver_partial(Major, Minor, Patch, Parts),
    semver_tags(Tags, Parts, PartsTags),
    semver_prefix(Prefix, PartsTags, Atom);
    semver_prefix(Prefix, PartsTags, Atom),
    semver_tags(Tags, Parts, PartsTags),
    semver_partial(Major, Minor, Patch, Parts)
  ).

% Unifies semver parts Desired and Part if Part is numeric and otherwise
% unifies Desired with '#'.
pin_version_part(Desired, Part) :-
  (numeric(Part) -> Desired = Part; Desired = '#').

% Unifies semver version ranges Desired and Current if current is numeric.
pin_version(Desired, Version) :-
  semver(_, Major, Minor, Patch, Tags, Version),
  pin_version_part(DesiredMajor, Major),
  pin_version_part(DesiredMinor, Minor),
  pin_version_part(DesiredPatch, Patch),
  semver('', DesiredMajor, DesiredMinor, DesiredPatch, Tags, Desired).
