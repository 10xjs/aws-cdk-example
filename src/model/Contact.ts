import * as JsonApi from './JsonApi';
import {Timestamps} from './Timestamps';

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
   * @format email
   */
  email: string;
}

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
