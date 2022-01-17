/* eslint-disable no-undef */
import jsdom from "jsdom";
// console.log(jsdom);
import { mount } from "@vue/test-utils";
import Questionnaire from "@/components/Questionnaire/Questionnaire.vue";

describe("Task Component unit tests: ", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Questionnaire, {
      propsData: {
        isReady: true,
        isGameOver: false,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test("calls answerClicked function when play button is clicked", () => {
    const wrapper = mount(Questionnaire, {
      dataProps: {
        isReady: false,
        isGameOver: false,
      },
    });
    const answerClicked = jest.fn();
    wrapper.setMethods({ answerClicked: answerClicked });
    wrapper.find("button").trigger("click");

    expect(answerClicked).toHaveBeenCalled();
  });
});
