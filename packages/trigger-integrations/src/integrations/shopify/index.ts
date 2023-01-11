import { getTriggerRun } from "@trigger.dev/sdk";
import { z } from "zod";
import { shopify } from "internal-providers";

export type SearchVariantsOptions = z.infer<
  typeof shopify.schemas.SearchVariantsBodySchema
>;
export type SearchVariantsResponse = z.infer<
  typeof shopify.schemas.SearchVariantsSuccessResponseSchema
>;

export async function searchProductVariants(
  key: string,
  options: SearchVariantsOptions
): Promise<SearchVariantsResponse> {
  const run = getTriggerRun();

  if (!run) {
    throw new Error("Cannot call getProducts outside of a trigger run");
  }

  const output = await run.performRequest(key, {
    service: "shopify",
    endpoint: "productVariants.search",
    params: options,
    response: {
      schema: shopify.schemas.SearchVariantsSuccessResponseSchema,
    },
  });

  return output;
}

export type CreateVariantBody = z.infer<
  typeof shopify.schemas.CreateVariantBodySchema
>;

export async function createProductVariant(
  key: string,
  options: CreateVariantBody
): Promise<any> {
  const run = getTriggerRun();

  if (!run) {
    throw new Error("Cannot call getProducts outside of a trigger run");
  }

  const output = await run.performRequest(key, {
    service: "shopify",
    endpoint: "productVariant.create",
    params: options,
    response: {
      schema: z.any(),
    },
  });

  return output;
}