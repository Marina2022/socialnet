import ProfileStatus from "./ProfileStatusC";
import {create} from "react-test-renderer";

describe("ProfileStatus", () => {
  test('state == props', () => {
    const component = create(<ProfileStatus status="aha"/>);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("aha")
  });

  test("span exists", async () => {
    const component = create(<ProfileStatus status="aha"/>);
    const root = component.root;
    const span = await root.findByType("span");
    expect(span).not.toBeNull()
  });

  test("span is from props", async () => {
    const component = create(<ProfileStatus status="aha"/>);
    const root = component.root;
    const span = await root.findByType("span");
    expect(span.children[0]).toBe("aha");
  });

  test("input does not exists", async() => {
    const component = create(<ProfileStatus status="aha"/>);
    const root = component.root;
    expect(()=>{
      let input = root.findByType('input');
    }).toThrow();
  });

  test("input turns up on click", async () => {
    const component = create(<ProfileStatus status="aha" me={true}/>);
    const root = component.root;
    const span = await root.findByType("span");
    span.props.onClick();
    const input = await root.findByType("input");
    expect(input).not.toBeNull()
  });
});