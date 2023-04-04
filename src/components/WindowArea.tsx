import type { Component } from "solid-js";

import WindowContainer from "./WindowContainer";

const WindowArea: Component = () => {
  return (
    <div>
      <WindowContainer>
        <h1>Hello World!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorum
          facilis exercitationem provident quia repudiandae molestias nobis
          voluptas vitae eaque. Odio iste debitis ipsam aperiam laborum placeat
          est possimus in.
        </p>
      </WindowContainer>
    </div>
  );
};

export default WindowArea;
