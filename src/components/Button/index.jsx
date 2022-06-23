import './styles.css'

export const Button = ({ onClick, noMorePosts }) => (
    <button disabled={noMorePosts} className='button' onClick={onClick}>
        Load more
    </button>
)