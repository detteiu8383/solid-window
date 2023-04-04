import { style } from "@macaron-css/core";
import type { Component } from "solid-js";

const styles = {
  container: style({
    color: "white",
    margin: 0,
    padding: 0,
  }),
};

const WindowHeader: Component<{
  title: string;
  color: string;
  onClickDelete?: () => void;
}> = (props) => {
  return (
    <div class={styles.container} style={{ background: props.color }}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default WindowHeader;
