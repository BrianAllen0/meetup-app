import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {});
