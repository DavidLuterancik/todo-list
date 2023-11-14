import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div id="sidebar">
                <h1>Router</h1>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/info">Info</Link>
                        </li>
                        <li>
                            <Link to="/todo">todo</Link>
                        </li>
                        <li>
                            <Link to="/todo/123">todo/123</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
