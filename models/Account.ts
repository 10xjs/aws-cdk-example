import {ApiResource} from './JsonApi';
import {Timestamps} from './Timestamps';

export declare class Account implements ApiResource {
  type: 'accounts';
  id: string;
  attributes: {
    name: string;
  };
  links: {
    self: string;
  };
  relationships: {
    contacts: {
      links: {
        self: string;
        related: string;
      };
    };
  };
  meta: Timestamps;
}
