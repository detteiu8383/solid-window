import { style } from "@macaron-css/core";
import type { ParentComponent } from "solid-js";
import { createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import WindowHeader from "./WindowHeader";

const EDGE_WIDTH = 8;
const MIN_WIDTH = EDGE_WIDTH * 2;
const MIN_HEIGHT = EDGE_WIDTH * 2;

const styles = {
  edges: {
    /* eslint-disable sort/object-properties */
    topLeft: style({
      gridArea: "1 / 1 / 2 / 2",
      cursor: "nwse-resize",
    }),
    top: style({
      gridArea: "1 / 2 / 2 / 3",
      cursor: "ns-resize",
    }),
    topRight: style({
      gridArea: "1 / 3 / 2 / 4",
      cursor: "nesw-resize",
    }),
    left: style({
      gridArea: "2 / 1 / 3 / 2",
      cursor: "ew-resize",
    }),
    right: style({
      gridArea: "2 / 3 / 3 / 4",
      cursor: "ew-resize",
    }),
    bottomLeft: style({
      gridArea: "3 / 1 / 4 / 2",
      cursor: "nesw-resize",
    }),
    bottom: style({
      gridArea: "3 / 2 / 4 / 3",
      cursor: "ns-resize",
    }),
    bottomRight: style({
      gridArea: "3 / 3 / 4 / 4",
      cursor: "nwse-resize",
    }),
    /* eslint-enable sort/object-properties */
  },
  edgesWrapper: style({
    display: "grid",
    gridTemplateColumns: `${EDGE_WIDTH}px 1fr ${EDGE_WIDTH}px`,
    gridTemplateRows: `${EDGE_WIDTH}px 1fr ${EDGE_WIDTH}px`,
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  }),
};

type Position = {
  x: number;
  y: number;
};

type WindowData = {
  title: string;
  topLeft: Position;
  bottomRight: Position;
  color: string;
};

const WindowContainer: ParentComponent = (props) => {
  let topLeftRef: HTMLDivElement;
  let topRef: HTMLDivElement;
  let topRightRef: HTMLDivElement;
  let leftRef: HTMLDivElement;
  let rightRef: HTMLDivElement;
  let bottomLeftRef: HTMLDivElement;
  let bottomRef: HTMLDivElement;
  let bottomRightRef: HTMLDivElement;

  let headerRef: HTMLDivElement;

  const [offsetPosition, setOffsetPosition] = createSignal<Position>({
    x: 0,
    y: 0,
  });

  const [windowData, setWindowData] = createStore<WindowData>({
    bottomRight: { x: 500, y: 300 },
    color: "pink",
    title: "new Window",
    topLeft: { x: 0, y: 0 },
  });

  const handlePointerMoveOnLeft = (e: PointerEvent) => {
    let newX = e.pageX - offsetPosition().x;
    if (windowData.bottomRight.x - newX < MIN_WIDTH) {
      newX = windowData.bottomRight.x - MIN_WIDTH;
    }
    setWindowData("topLeft", "x", newX);
  };

  const handlePointerMoveOnTop = (e: PointerEvent) => {
    let newY = e.pageY - offsetPosition().y;
    if (windowData.bottomRight.y - newY < MIN_HEIGHT) {
      newY = windowData.bottomRight.y - MIN_HEIGHT;
    }
    setWindowData("topLeft", "y", newY);
  };
  const handlePointerMoveOnRight = (e: PointerEvent) => {
    let newX = e.pageX - offsetPosition().x + EDGE_WIDTH;
    if (newX - windowData.topLeft.x < MIN_WIDTH) {
      newX = windowData.topLeft.x + MIN_WIDTH;
    }
    setWindowData("bottomRight", "x", newX);
  };

  const handlePointerMoveOnBottom = (e: PointerEvent) => {
    let newY = e.pageY - offsetPosition().y + EDGE_WIDTH;
    console.info(offsetPosition().y);
    if (newY - windowData.topLeft.y < MIN_WIDTH) {
      newY = windowData.topLeft.y + MIN_WIDTH;
    }
    setWindowData("bottomRight", "y", newY);
  };

  const handleHeaderMove = (e: PointerEvent) => {
    const deltaX =
      e.pageX - windowData.topLeft.x - offsetPosition().x - EDGE_WIDTH;
    const deltaY =
      e.pageY - windowData.topLeft.y - offsetPosition().y - EDGE_WIDTH;
    setWindowData("topLeft", "x", (p) => p + deltaX);
    setWindowData("topLeft", "y", (p) => p + deltaY);
    setWindowData("bottomRight", "x", (p) => p + deltaX);
    setWindowData("bottomRight", "y", (p) => p + deltaY);
  };

  const handlePointerDown = (
    ref: HTMLElement,
    pointerMoveHandler: (e: PointerEvent) => void
  ) => {
    ref.addEventListener("pointerdown", (e: PointerEvent) => {
      ref.setPointerCapture(e.pointerId);
      setOffsetPosition({
        x: e.offsetX,
        y: e.offsetY,
      });
      ref.addEventListener("pointermove", pointerMoveHandler);
      ref.addEventListener(
        "pointerup",
        (e: PointerEvent) => {
          ref.removeEventListener("pointermove", pointerMoveHandler);
          ref.releasePointerCapture(e.pointerId);
        },
        { once: true }
      );
    });
  };

  onMount(() => {
    handlePointerDown(topLeftRef, (e) => {
      handlePointerMoveOnTop(e);
      handlePointerMoveOnLeft(e);
    });

    handlePointerDown(topRef, handlePointerMoveOnTop);

    handlePointerDown(topRightRef, (e) => {
      handlePointerMoveOnTop(e);
      handlePointerMoveOnRight(e);
    });

    handlePointerDown(leftRef, handlePointerMoveOnLeft);

    handlePointerDown(rightRef, handlePointerMoveOnRight);

    handlePointerDown(bottomLeftRef, (e) => {
      handlePointerMoveOnBottom(e);
      handlePointerMoveOnLeft(e);
    });

    handlePointerDown(bottomRef, handlePointerMoveOnBottom);

    handlePointerDown(bottomRightRef, (e) => {
      handlePointerMoveOnBottom(e);
      handlePointerMoveOnRight(e);
    });

    handlePointerDown(headerRef, handleHeaderMove);
  });

  return (
    <div
      class={style({
        position: "absolute",
      })}
      style={{
        height: `${windowData.bottomRight.y - windowData.topLeft.y}px`,
        left: `${windowData.topLeft.x}px`,
        top: `${windowData.topLeft.y}px`,
        width: `${windowData.bottomRight.x - windowData.topLeft.x}px`,
      }}
    >
      <div class={styles.edgesWrapper}>
        <div ref={topLeftRef!} class={styles.edges.topLeft}></div>
        <div ref={topRef!} class={styles.edges.top}></div>
        <div ref={topRightRef!} class={styles.edges.topRight}></div>
        <div ref={leftRef!} class={styles.edges.left}></div>
        <div ref={rightRef!} class={styles.edges.right}></div>
        <div ref={bottomLeftRef!} class={styles.edges.bottomLeft}></div>
        <div ref={bottomRef!} class={styles.edges.bottom}></div>
        <div ref={bottomRightRef!} class={styles.edges.bottomRight}></div>
        <div
          class={style({
            borderRadius: "16px",
            gridArea: "2 / 2 / 3 / 3",
            outline: `solid ${EDGE_WIDTH}px ${windowData.color}`,
          })}
        >
          <div
            class={style({
              cursor: "grab",
              position: "relative",
            })}
            ref={headerRef!}
          >
            <WindowHeader title={windowData.title} color={windowData.color} />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default WindowContainer;
