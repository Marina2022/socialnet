import {maxLengthCreator, required} from "../../common/form-controls/validators";
import React from "react";
import {Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../../common/form-controls/form-contols";

const maxLength10 = maxLengthCreator(10);
export type PostFormPropsType = {
    postText: string
}
export const NewPostForm: React.FC<InjectedFormProps<PostFormPropsType>> = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <Field component={Textarea} name="postText" validate={[required, maxLength10]}/>
        <div>
            <button>Add Post</button>
        </div>
    </form>
}