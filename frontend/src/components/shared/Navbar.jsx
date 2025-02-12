import React ,{useState}from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">gram</span>
          </h1>
        </div>

        {/* Full Menu (Visible on Large Screens) */}
        <div className="hidden lg:flex items-center lg:gap-12">
          <ul className="flex flex-row font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Login/Signup or Profile */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Link to="/profile">View Profile</Link>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button onClick={logoutHandler} className="text-left">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Profile Toggle (Visible Only on Mobile) */}
        <div className="lg:hidden">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
            {user ? (
              <Avatar>
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
              </Avatar>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </div>

          {/* Mobile Menu (Dropdown) */}
          {isMenuOpen && (
            <div className="absolute right-0 top-16 bg-white rounded-lg shadow-lg z-50 p-4 w-full">
              <ul className="flex flex-col font-medium items-start gap-2">
                {user && user.role === "recruiter" ? (
                  <>
                    <li>
                      <Link to="/admin/companies">Companies</Link>
                    </li>
                    <li>
                      <Link to="/admin/jobs">Jobs</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/jobs">Jobs</Link>
                    </li>
                    <li>
                      <Link to="/browse">Browse</Link>
                    </li>
                  </>
                )}
              </ul>

              {!user ? (
                <div className="mt-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full mb-2">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-4">
                  {user.role === "student" && (
                    <Link to="/profile" className="block mb-2">
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="text-left text-red-600 hover:underline w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    )
}

export default Navbar