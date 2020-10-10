import {ApiResource} from './JsonApi';
import {Timestamps} from './Timestamps';

/**
 * Account resource
 */
export declare class Account implements ApiResource {
  type: 'accounts';

  /**
   * @example id
   */
  id: string;

  attributes: {
    /**
     * @example Coalition Inc.
     */
    name: string;
  };

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
