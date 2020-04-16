import React, { useState, useEffect } from "react";
import Navigation from "../navigations/Navigation";
import { db } from "../population/config";
import { email } from "../account/QueriesProfile";

export default function Dashboard() {
  return <Navigation />;
}
