import * as JsonApi from './JsonApi';
import {Timestamps} from './Timestamps';

export declare class Foo {
  wtf: boolean;
}

export declare class Account {
  wtf: number;
}

export declare class Account2 {
  wtf: string;
}

export declare class Contact implements JsonApi.Resource {
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
