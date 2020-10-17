import * as JsonApi from './JsonApi';
import { Timestamps } from './Timestamps';

interface ContactAttributes extends JsonApi.ResourceAttributes {
  /**
   * @example Joshua
   */
  firstName: string;

  /**
   * @example Motta
   */
  lastName: string;

  /**
   * Contact email address.
   *
   * @format email
   */
  email: string;
}

/**
 * Contact resource model.
 */
export interface Contact extends JsonApi.Resource {
  type: 'contacts';

  /**
   * @example id
   */
  id: string;

  attributes: ContactAttributes;

  relationships: {
    account: {
      links: {
        self: string;
        related: string;
      };
    };
  };

  meta: Timestamps;
}
