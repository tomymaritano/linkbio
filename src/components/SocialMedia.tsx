import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";


const socialIcons = [
    { icon: <FaXTwitter />, url: "https://x.com/hacklabdog"},
    { icon: <FaGithub />, url: "https://github.com/tomymaritano"},
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/tomymaritano/"},
]

const SocialMedia = () => {
    return(
        <div className="flex gap-1 justify-center items-center w-[40px] h-[40px]">
            {socialIcons.map((item, index) =>(
                <a key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#21262D] text-white p-4  rounded-full  hover:text-blue-100 transition-colors "
                >
                    {item.icon}
                </a>
            ))}
        </div>
    )
}

export default SocialMedia