import { Link } from "next-view-transitions";

export default function Settings() {
    return (
        <div className='flex flex-col items-center py-4 px-12'>
            <h2>
                This is the <span className='settings'>Settings</span> Page
            </h2>
            <Link href='/'>Open homepage →</Link>
        </div>
    )
} 