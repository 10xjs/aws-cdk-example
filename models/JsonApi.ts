/**
 * JSON:API meta information.
 *
 * https://jsonapi.org/format/#document-meta
 *
 * @example {}
 * @internal
 */
export interface ApiMeta {
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
export type ApiLink =
  | string
  | {
      /**
       * @hidden
       */
      meta?: ApiMeta;
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
export interface ApiLinks {
  /**
   * @hidden
   */
  [key: string]: ApiLink;
}

/**
 * JSON:API resource identifier
 * .
 * See: https://jsonapi.org/format/#document-resource-identifier-objects
 *
 *  @internal
 */
export interface ApiResourceIdentifier {
  /**
   * The type member is used to describe resource objects that share common
   * attributes and relationships.
   *
   * @example resources
   * @hidden
   */
  type: string;

  /**
   * The id combined with type identify a globally unique resource.
   *
   * @example id
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
  meta?: ApiMeta;
}

/**
 * JSON:API relationship object.
 *
 * See: https://jsonapi.org/format/#document-resource-object-relationships
 *
 * @internal
 */
export interface ApiRelationship {
  /**
   * A links object containing at least one of `self` or `related`
   *
   * @hidden
   */
  links?: ({self: ApiLink} | {related: ApiLink}) & ApiLinks;
  /**
   * Resource linkage in a compound document allows a client to link together all
   * of the included resource objects without having to GET any URLs via links.
   *
   * See: https://jsonapi.org/format/#document-resource-object-linkage
   *
   * @hidden
   */
  data?: null | ApiResourceIdentifier | ApiResourceIdentifier[];

  /**
   * A meta object that contains non-standard meta-information about the
   * relationship.
   *
   * @hidden
   */
  meta?: ApiMeta;
}

/**
 * JSON:API relationships object.
 *
 * Members of the relationships object ("relationships") represent references
 * from the resource object in which it’s defined to other resource objects.
 *
 * @internal
 */
export interface ApiRelationships {
  /**
   * Members of the relationships object ("relationships") represent references
   * from the resource object in which it’s defined to other resource objects.
   * @hidden
   */
  [key: string]: ApiRelationship;
}

/**
 * JSON:API meta information.
 *
 * https://jsonapi.org/format/#document-meta
 *
 * @internal
 */
export interface ApiAttributes {
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
export interface ApiResource {
  /**
   * The type member is used to describe resource objects that share common
   * attributes and relationships.
   *
   * @example resources
   * @hidden
   */
  type: string;

  /**
   * The id combined with type identify a globally unique resource.
   *
   * @example id
   * @readOnly
   * @hidden
   */
  id: string;

  /**
   * An attributes object representing some of the resource’s data.
   *
   * @hidden
   */
  attributes?: ApiAttributes;

  /**
   * A relationships object describing relationships between the resource and
   * other JSON:API resources.
   *
   * @hidden
   */
  relationships?: ApiRelationships;

  /**
   * A links object containing links related to the resource.
   *
   * @hidden
   */
  links?: ApiLinks;

  /**
   * A meta object containing non-standard meta-information about a resource
   * that can not be represented as an attribute or relationship.
   *
   * @hidden
   */
  meta?: ApiMeta;
}

/**
 * JSON:API top-level response document.
 *
 * See: https://jsonapi.org/format/#document-top-level
 *
 * @internal
 */
export interface ApiResponse {
  /**
   * The document's primary data is a representation of the resource or
   * collection of resources targeted by a request.
   *
   * @hidden
   */
  data:
    | ApiResource
    | ApiResourceIdentifier
    | ApiResource[]
    | ApiResourceIdentifier[]
    | null;

  /**
   * A meta object that contains non-standard meta-information.
   *
   * @hidden
   */
  meta?: ApiMeta;

  /**
   * A links object related to the primary data.
   *
   * @hidden
   */
  links?: ApiLinks;

  /**
   * An array of resource objects that are related to the primary data and/or
   * each other ("included resources").
   *
   * @hidden
   */
  included?: ApiResource[];
}

/**
 * JSON:API error object.
 *
 * See: https://jsonapi.org/format/#error-objects
 *
 * @internal
 */
export interface ApiError {
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
    about: ApiLink;
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
  meta?: ApiMeta;
}

/**
 * JSON:API top-level error document.
 *
 * See: https://jsonapi.org/format/#document-top-level
 * @internal
 */
export type ApiErrorResponse = {
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
  meta?: ApiMeta;
};
