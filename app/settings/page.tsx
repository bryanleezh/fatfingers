
import { Link } from "next-view-transitions";

export default function settings() {
    return (
        <div className='demo-box'>
        <h2>
            This is the <span className='settings'>Settings</span>
        </h2>
        <Link href='/'>Open homepage →</Link>
        </div>
    )
} 