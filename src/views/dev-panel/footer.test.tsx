import { shallow } from "enzyme";
import * as React from "react";

import { FooterContent } from "./footer";

describe("FooterContent", () => {
    it("should contain Itly Addon", () => {
        const wrapper = shallow(<FooterContent />);
        expect(wrapper.text()).toEqual(expect.stringContaining("Itly Addon"));
    });
});
