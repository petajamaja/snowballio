import { config } from "@vue/test-utils";
import mitt from "mitt";
config.global.mocks = {
  emitter: mitt()
};
