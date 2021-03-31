import styles from './new-video.module.css';

export function NewVideo() {
    return (
        <div className="container">
            <form className="row form">
            <label htmlFor="title">Enter video title</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>

            <label htmlFor="title">Enter video title</label>
            <div className="col-12 input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>

            <label htmlFor="title">Enter video title</label>
            <div className="col-12 input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>

            <label htmlFor="title">Enter video title</label>
            <div className="col-12 input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>

            <label htmlFor="title">Enter video title</label>
            <div className="col-12 input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>
            
        </form>
        </div>
    )
}