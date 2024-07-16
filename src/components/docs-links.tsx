import reactLogo from "./../assets/react.svg";
// todo: fix public url for vite logo
//import viteLogo from "./../../public/vite.svg";
const viteLogo = "https://vitejs.dev/logo.svg";

function DocsLink() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more:
      </p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  );
}

export default DocsLink;
