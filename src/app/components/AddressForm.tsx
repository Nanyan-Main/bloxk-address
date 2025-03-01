"use client";
import useAddress from "@/hooks/useAddress";
import { useToast } from "@/hooks/useToast";
import { MIN_ADDRESS_LENGTH, STATUS } from "@/utils/constant";
import { Form, Formik } from "formik";
import { object, string } from "yup";

export default function AddressForm() {
  const { addAddress } = useAddress();
  const { showToastSuccess, showToastError } = useToast();
  const validationsSchema = object({
    address: string()
      .required("address is required")
      .min(MIN_ADDRESS_LENGTH, "address is too short"),
  });
  const handleSubmit = async (address: string) => {
    try {
      const { status, message } = await addAddress(address);
      if (message && status !== STATUS.OK) {
        showToastError(message);
        return;
      }
      showToastSuccess("Success");
    } catch (error: any) {
      showToastError(error.message);
      console.error(error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          address: "",
        }}
        validationSchema={validationsSchema}
        validateOnChange
        isInitialValid={false}
        validateOnMount={false}
        onSubmit={(values) => {
          handleSubmit(values.address);
        }}
      >
        {(props) => {
          const {
            handleSubmit,
            errors,
            setFieldValue,
            values,
            isValid,
            touched,
            setFieldTouched,
          } = props;

          const addressError =
            ((touched.address || values.address) && errors.address) || "";
          return (
            <div>
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Submit your address
                </h2>
              </div>

              <div>
                <Form onSubmit={handleSubmit} className="space-y-6" autoFocus>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        value={values.address}
                        id="address"
                        name="address"
                        onChange={(e) =>
                          setFieldValue("address", e.target.value)
                        }
                        onBlur={() => setFieldTouched("address")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {addressError && (
                      <p className="text-red-700">{addressError}</p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
