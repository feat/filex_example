import React, { useContext, useState } from 'react';
import { createComment } from './requests';
import { AuthInfo } from './AuthInfoProvider';

function CommentCreate(props) {
    const {
        match: { params: { id }}        
     } = props;
    const { state: { token }} = useContext(AuthInfo);
    const [formValues, setFormValues] = useState({
        content: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <form 
            className="App"
            onSubmit={(e) => {
                e.preventDefault();
                // TODO should validate data before submit.
                setIsSubmitting(true);
                createComment({
                    eventId: id,
                    content: formValues.content,
                }, token).then(() => {
                    props.history.goBack();
                })
                .catch((err) => {
                    global.alert(err.message);
                    setIsSubmitting(false);
                });
            }}
        >
            <div className="App__header">
                <div className="PageHeader">
                    <div className="PageHeader__left pl_12">
                        <button 
                            className='button button_merge'
                            type='button'
                            onClick={() => {
                                props.history.goBack();
                            }}
                            disabled={isSubmitting}
                        >
                            取消
                        </button>
                    </div>
                    <h3 className="PageTitle">新评论</h3>
                    <div className="PageHeader__right pr_12">
                        <button 
                            className='button button_merge'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            发表
                        </button>
                    </div>
                </div>
            </div>
            <div className="App__content Form">
                <div className="FormItem">
                    <textarea 
                        id='content' 
                        autoFocus
                        placeholder="想要说点什么？"
                        value={formValues.content} 
                        name='content'
                        className='FormInput'
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                content: e.target.value,
                            })
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

export default CommentCreate;