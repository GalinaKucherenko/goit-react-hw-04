import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./SearchBar.module.css";

const validationSchema = Yup.object().shape({
    topic: Yup.string()
        .min(3, "Minimum 3 letters")
        .required("This field is required"),
});

export default function SearchBar({ onSearch }) {
    return (
        <div className={css.formik}>
            <Formik
                initialValues={{ topic: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    onSearch(values.topic);
                    actions.resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form className={css.form}>
                        <Field 
                            className={css.input} 
                            type="text" 
                            name="topic" 
                            placeholder="Search images and photos" 
                        />
                        <button className={css.btn} type="submit">Search</button>
                        {errors.topic && touched.topic ? (
                            <div>{errors.topic}</div>
                        ) : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
