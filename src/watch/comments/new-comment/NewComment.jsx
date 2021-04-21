import { useState } from "react"

export function NewComment({ visible, onCancel: closeForm, onSubmit }) {
    const [comment, setComment] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();  
        setComment("");
        onSubmit(comment)
    }

    const onCancel = () => {
        setComment("");
        closeForm();
    }

    return (
        <>
            {
                visible &&  <form className="row" onSubmit = { formSubmit }>
                {/* <label class="col-12 p-0" htmlFor="comment">Add a public comment</label> */}
                            <div className="input col-12 p-0">
                                <input type="text" placeholder="Add a public comment" value = { comment } onChange = { (e) => { setComment(e.target.value) } } />
                            </div> 
                            <div className="buttons row col-12 p-0" style={{ justifyContent: 'flex-end' }}>
                                    <button className="btn btn--danger btn--inverted " style={{ marginRight: '0.5em' }} onClick = { onCancel }>Cancel</button>
                                    <button className="btn btn--primary btn--inverted ">Comment</button>
                            </div>
                        </form>
    
            }
        </>
    )
}