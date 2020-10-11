import {Foo} from '../Contact';
import * as JsonApi from '../JsonApi';
import {Timestamps} from '../Timestamps';

export interface AccountAttributes extends JsonApi.ResourceAttributes {
  /**
   * @example Coalition Inc.
   */
  name: string;

  foo: Foo;
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

  relationships: {
    contacts: {
      links: {
        /**
         * @example /accounts/id/relationships/contacts
         */
        self: string;

        /**
         * @example /accounts/id/contacts
         */
        related: string;
      };
    };
  };

  meta: Timestamps;
}
