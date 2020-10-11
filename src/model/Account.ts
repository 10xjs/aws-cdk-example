import * as JsonApi from './JsonApi';
import {Timestamps} from './Timestamps';

interface AccountAttributes extends JsonApi.ResourceAttributes {
  /**
   * @example Coalition Inc.
   */
  name: string;
}

interface AccountRelationships extends JsonApi.Relationships {
  contacts: {
    links: {
      self: string;
      related: string;
    };
  };
}

/**
 * Account resource
 */
export interface Account extends JsonApi.Resource {
  type: 'accounts';

  /**
   * @example id
   */
  id: string;

  attributes: AccountAttributes;

  links: {
    /**
     * @example /accounts/id
     */
    self: string;
  };

  relationships: AccountRelationships;

  meta: Timestamps;
}
