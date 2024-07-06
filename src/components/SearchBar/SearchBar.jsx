import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
    return (
        <div className={css.formik}>
            <Formik
                initialValues={{ topic: "" }}
                onSubmit={(values, actions) => {
                    console.log("Search term submitted:", values.topic); // Added console.log
                    onSearch(values.topic);
                    actions.resetForm();
                }}
            >
                <Form className={css.form}>
                    <Field className={css.input} type="text" name="topic" placeholder="Search images and photos" />
                    <button className={css.btn} type="submit">Search</button>
                </Form>
            </Formik>
        </div>
    );
}