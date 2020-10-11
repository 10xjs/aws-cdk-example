/**
 * JSON:API meta information.
 *
 * https://jsonapi.org/format/#document-meta
 *
 * @internal
 */
export interface Meta {
  /**
   * Any members MAY be specified within meta objects
   *
   * @hidden
   */
  [key: string]: any;
}

/**
 * JSON:API link value.
 *
 * See: https://jsonapi.org/format/#document-links
 *
 * @format uri
 * @internal
 */
export type Link =
  | string
  | {
      /**
       * @hidden
       */
      meta?: Meta;
      /**
       * @format uri
       * @hidden
       */
      href?: string;
    };

/**
 * JSON:API links object.
 *
 * See: https://jsonapi.org/format/#document-links
 *
 * @internal
 */
export interface Links {
  /**
   * @hidden
   */
  [key: string]: Link;
}

/**
 * JSON:API resource identifier
 * .
 * See: https://jsonapi.org/format/#document-resource-identifier-objects
 *
 *  @internal
 */
export interface ResourceIdentifier {
  /**
   * The type member is used to describe resource objects that share common
   * attributes and relationships.
   *
   * @hidden
   */
  type: string;

  /**
   * The id combined with type identify a globally unique resource.
   *
   * @readOnly
   * @hidden
   */
  id: string;

  /**
   * A meta object containing non-standard meta-information about a resource
   * that can not be represented as an attribute or relationship.
   *
   * @hidden
   */
  meta?: Meta;
}

/**
 * JSON:API relationship object.
 *
 * See: https://jsonapi.org/format/#document-resource-object-relationships
 *
 * @internal
 */
export interface Relationship {
  /**
   * A links object containing at least one of `self` or `related`
   *
   * @hidden
   */
  links?: ({self: Link} | {related: Link}) & Links;
  /**
   * Resource linkage in a compound document allows a client to link together all
   * of the included resource objects without having to GET any URLs via links.
   *
   * See: https://jsonapi.org/format/#document-resource-object-linkage
   *
   * @hidden
   */
  data?: null | ResourceIdentifier | ResourceIdentifier[];

  /**
   * A meta object that contains non-standard meta-information about the
   * relationship.
   *
   * @hidden
   */
  meta?: Meta;
}

/**
 * JSON:API relationships object.
 *
 * Members of the relationships object ("relationships") represent references
 * from the resource object in which it’s defined to other resource objects.
 *
 * @internal
 */
export interface Relationships {
  /**
   * Members of the relationships object ("relationships") represent references
   * from the resource object in which it’s defined to other resource objects.
   * @hidden
   */
  [key: string]: Relationship;
}

/**
 * JSON:API resource object attributes.
 *
 * Members of the attributes object (“attributes”) represent information about
 * the resource object in which it’s defined.
 *
 * https://jsonapi.org/format/#document-resource-object-attributes
 *
 * @internal
 */
export interface ResourceAttributes {
  /**
   * @hidden
   */
  [key: string]: any;
}

/**
 * JSON:API resource object.
 *
 * Resource objects appear in a JSON:API document to represent resources.
 *
 * See: https://jsonapi.org/format/#document-resource-objects
 *
 * @internal
 */
export interface Resource {
  /**
   * The type member is used to describe resource objects that share common
   * attributes and relationships.
   *
   * @hidden
   */
  type: string;

  /**
   * The id combined with type identify a globally unique resource.
   *
   * @readOnly
   * @hidden
   */
  id: string;

  /**
   * An attributes object representing some of the resource’s data.
   *
   * @hidden
   */
  attributes?: ResourceAttributes;

  /**
   * A relationships object describing relationships between the resource and
   * other JSON:API resources.
   *
   * @hidden
   */
  relationships?: Relationships;

  /**
   * A links object containing links related to the resource.
   *
   * @hidden
   */
  links?: Links;

  /**
   * A meta object containing non-standard meta-information about a resource
   * that can not be represented as an attribute or relationship.
   *
   * @hidden
   */
  meta?: Meta;
}

/**
 * JSON:API top-level response document.
 *
 * See: https://jsonapi.org/format/#document-top-level
 *
 * @internal
 */
export interface ResponseDocument {
  /**
   * The document's primary data is a representation of the resource or
   * collection of resources targeted by a request.
   *
   * @hidden
   */
  data:
    | Resource
    | ResourceIdentifier
    | Resource[]
    | ResourceIdentifier[]
    | null;

  /**
   * A meta object that contains non-standard meta-information.
   *
   * @hidden
   */
  meta?: Meta;

  /**
   * A links object related to the primary data.
   *
   * @hidden
   */
  links?: Links;

  /**
   * An array of resource objects that are related to the primary data and/or
   * each other ("included resources").
   *
   * @hidden
   */
  included?: Resource[];
}

/**
 * JSON:API error object.
 *
 * See: https://jsonapi.org/format/#error-objects
 *
 * @internal
 */
export interface Error {
  /**
   * A unique identifier for this particular occurrence of the problem.
   *
   * @hidden
   */
  id?: string;

  /**
   * A links object containing a link that leads to further details about this
   * particular occurrence of the problem.
   *
   * @hidden
   */
  links?: {
    about: Link;
  };

  /**
   * The HTTP status code applicable to this problem, expressed as a string value.
   *
   * @hidden
   */
  status?: string;

  /**
   * An application-specific error code, expressed as a string value.
   *
   * @hidden
   */
  code?: string;

  /**
   * A short, human-readable summary of the problem that **SHOULD NOT** change
   * from occurrence to occurrence of the problem, except for purposes of
   * localization.
   *
   * @hidden
   */
  title?: string;

  /**
   * A human-readable explanation specific to this occurrence of the problem.
   * Like title, this field’s value can be localized.
   *
   * @hidden
   */
  detail?: string;

  /**
   * An object containing references to the source of the error.
   *
   * @hidden
   */
  source?: {
    /**
     * A JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the
     * associated entity in the request document (e.g. "/data" for a primary
     * data object, or "/data/attributes/title" for a specific attribute).
     *
     * @hidden
     */
    pointer?: string;

    /**
     * A string indicating which URI query parameter caused the error.
     *
     * @hidden
     */
    parameter?: string;
  };

  /**
   * A meta object containing non-standard meta-information about the error.
   *
   * @hidden
   */
  meta?: Meta;
}

/**
 * JSON:API top-level error document.
 *
 * See: https://jsonapi.org/format/#document-top-level
 * @internal
 */
export interface ErrorDocument {
  /**
   * An array of error objects.
   *
   * @hidden
   */
  errors: Error[];

  /**
   * A meta object that contains non-standard meta-information.
   *
   * @hidden
   */
  meta?: Meta;
}
