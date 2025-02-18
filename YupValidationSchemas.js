
/**
 * import { YupObject } from "../../Utils/Validation/YupValidationSchemas";
 * import { CouponValidation } from "./CouponValidation";
 * 
 * <Formik
      initialValues={{ ...CouponInitialValues(updateId, oldData) }}
      validationSchema={YupObject(CouponValidation)}
      onSubmit={(values) => {
        // Put Add Or Update Logic Here
        values.start_date = new Date(values.start_date).toJSON()
        values.end_date = new Date(values.end_date).toJSON()
        // console.log(values)
        mutate(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Col>
          <Card>
            <div className="title-header option-title">
              <h5>{t(title)}</h5>
            </div>
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              <Row>
              </Row>
            </Form>
          </Card>
         <Col>
         )}
        </Formik> 
 */

/**
 * import { ifIsApplyAll, ifIsExpirable, ifTypeIsfree_shipping, nameSchema, categoryOrProductRequired } from "../../Utils/Validation/ValidationSchemas";

    export const CouponValidation = {
        title: nameSchema,
        description: nameSchema,
        code: nameSchema,
        type: nameSchema,
        min_spend: nameSchema,
        start_date: ifIsExpirable,
        end_date: ifIsExpirable,
        amount: ifTypeIsfree_shipping,
        // products: ifIsApplyAll,
        products: categoryOrProductRequired,
        categories: categoryOrProductRequired,
    }
 */


import * as Yup from "yup";

export const YupObject = (schemaObject) => Yup.object().shape(schemaObject);

export const emailSchema = Yup.string().email("Enter Valid Email").required();
export const passwordSchema = Yup.string().min(4, "Too Short!").max(20, "Too Long!").required();
export const nameSchema = Yup.string().required();
export const descriptionSchema = Yup.string().required().min(10, "The description must be at least 10 characters.");
export const roleIdSchema = Yup.string().required();
export const permissionsSchema = Yup.array().min(1).required();
export const dropDownScheme = Yup.array().min(1).required();

export const passwordConfirmationSchema = Yup.string()
  .when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
  }).required();


export const visibleTimeSchema = Yup.date().when("stock_status", {
  is: (val) => val === "coming_soon",
  then: Yup.date().required(),
});


export const ifTypeSimpleSchema = Yup.string().when("type", {
  is: (val) => val == "simple",
  then: Yup.string().required(),
  otherwise: Yup.string().notRequired()
});


export const ifTypeSimpleArraySchema = Yup.array().when("type", {
  is: (val) => val === "simple",
  then: Yup.array().min(1).required(),
  otherwise: Yup.string().notRequired()
});


export const ifIsUnlimited = Yup.number().when("is_unlimited", {
  is: (val) => !val,
  then: Yup.number().positive().required(),
});


export const ifIsExpirable = Yup.date().when("is_expired", {
  is: (val) => val,
  then: Yup.date().required(),
});


export const ifTypeIsfree_shipping = Yup.number().when("type", {
  is: (val) => val !== "free_shipping",
  then: Yup.number().positive().required(),
});


export const ifShippingTypeIsFree = Yup.number().when("shipping_type", {
  is: (val) => val !== "free",
  then: Yup.number().positive().required(),
});


export const discountSchema = Yup.number().min(0).max(100);
export const requiredSchema = Yup.mixed().required();
export const StatusSchema = Yup.boolean().required();

export const phoneSchema = Yup.string().min(6).max(15).required()


export const ifIsApplyAll = Yup.array().when("is_apply_all", {
  is: (val) => !val,
  then: Yup.array().min(1).required(),
});


export const categoryOrProductRequired = Yup.array().test( 
  function (value) {
    const { is_apply_all, categories, products } = this.parent;    
    if (!is_apply_all) {
      const x = (categories && categories.length > 0) || (products && products.length > 0);
      if(!x){
        return this.createError({
          path: this.path, 
          message: "Products or categories", 
        });
      }     
      
    }    
    return true; // If is_apply_all is true,
  }
);


export const videoLinkSchema = Yup.string().when('video_provider', {
  is: (val) => val,
  then: Yup.string().required(),
})


export const attributeValues = Yup.array().of(
  Yup.object().shape({
    value: Yup.string().required()
  })
)


export const variationSchema = Yup.array().of(Yup.object().shape({
  name: nameSchema,
  price: nameSchema,
  sku: nameSchema,
  quantity: nameSchema,
  attribute_values:Yup.array().of(Yup.object().shape({value:nameSchema})),
}))
