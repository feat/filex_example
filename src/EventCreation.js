import React, { useContext, useState } from 'react';
import { createEvent, publishEvent } from './requests';
import { AuthInfo } from './AuthInfoProvider';

const getCurrentDate = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.toLocaleDateString('en-US', {
        'month': '2-digit'
    })}-${date.getDate()}`;
}
function EventCreation(props) {
    const { state: { token }} = useContext(AuthInfo);
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        event_time: getCurrentDate(),
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <form 
            className="App"
            onSubmit={(e) => {
                e.preventDefault();
                // TODO should validate data before submit.
                setIsSubmitting(true);
                createEvent({
                    ...formValues,
                    html_content: `<h1>${formValues.title}</h1><p>${formValues.content}</p>`
                }, token).then(({ data }) => {
                    console.log(data);
                    return publishEvent(data.id, token);
                    // 返回上一页
                }).then(() => {
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
                    <h3 className="PageTitle">新事件</h3>
                    <div className="PageHeader__right pr_12">
                        <button 
                            className='button button_merge'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            发布
                        </button>
                    </div>
                </div>
            </div>
            <div className="App__content Form">
                <div className="FormItem">
                    <label htmlFor="event_time" className="FormLabel">日期</label>
                    <input 
                        type="date" 
                        id='event_time' 
                        name='event_time'
                        className='FormInput'
                        value={formValues.event_time} 
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                event_time: e.target.value,
                            })
                        }}
                    />
                </div>
                <div className="FormItem">
                    <label htmlFor="title" className="FormLabel">标题</label>
                    <input 
                        type="text" 
                        id='title' 
                        name='title'
                        value={formValues.title} 
                        className='FormInput'
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                title: e.target.value,
                            })
                        }}
                    />
                </div>
                <div className="FormItem">
                    <label htmlFor="content" className="FormLabel">内容</label>
                    <textarea 
                        id='content' 
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

export default EventCreation;