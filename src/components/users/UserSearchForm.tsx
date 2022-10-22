import {Form, Field, Formik, FormikHelpers} from "formik";
import React from "react";
import classNames from 'classnames'
import styles from "./users.module.css"
import {FilterType} from "../../types/types";

type PropsType = {
    onFilterChange: (filter: FilterType) => void
    filter: FilterType
}

type FormValues = {
    term: string,
    friend: string
}

export const UserSearchForm: React.FC<PropsType> = (props) => {
    const onSubmitHandler = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        const friend = values.friend === "all" ? null: values.friend === "followed" ? true : false;
        props.onFilterChange({term: values.term, friend: friend});
        setSubmitting(false);
    }

    const myFriend = props.filter.friend === true ? "followed" : props.filter.friend === false ? "not-followed": "all"

    return (
        <div className={styles.formik}>
            <Formik
                initialValues={{term: props.filter.term, friend: myFriend}}
        onSubmit={onSubmitHandler}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field className={styles.formikInput}
                               type="text"
                               name="term"
                               onChange={handleChange}
                               onBlur={handleBlur}

                        />
                        {errors.term && touched.term && errors.term}
                        <Field className={classNames(styles.formikInput, styles.formikSelect)}
                               name="friend" as="select"
                               onChange={handleChange}
                               onBlur={handleBlur}
                        >
                            <option value="all">All</option>
                            <option value="followed">Followed</option>
                            <option value="not-followed">Not followed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
