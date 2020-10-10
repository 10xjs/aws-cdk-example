import {ApiResource} from './JsonApi';
import {Timestamps} from './Timestamps';

export declare class Contact implements ApiResource {
  type: 'contacts';

  /**
   * @example id
   */
  id: string;

  attributes: {
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
  };

  meta: Timestamps;
}
