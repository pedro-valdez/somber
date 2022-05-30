const FETCHES = {
  PRODUCT_PROJECTION: `
    {
      "id": _id,
      "name": title,
      "price": defaultProductVariant.price,
      "imageSrc": defaultProductVariant.images[0].asset->url,
      "imageAlt": title,
      _createdAt,
    }
    `,
}

export default FETCHES
