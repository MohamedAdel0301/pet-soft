import { GitHubLogoIcon } from "@radix-ui/react-icons";
const AppFooter = () => {
  return (
    <footer className="mt-auto flex items-start justify-between border-t border-black/5 py-5">
      <small className="opacity-50">&copy; 2024 </small>
      <a href="https://github.com/MohamedAdel0301">
        <small className="flex items-center gap-1 text-gray-400 transition delay-75 ease-in-out hover:text-black">
          {<GitHubLogoIcon />}{" "}
          <span className="text-sm hover:cursor-pointer">Mohamed Adel</span>
        </small>
      </a>
    </footer>
  );
};

export default AppFooter;
