import React from "react";

export default function MobileOnlyDisclaimer() {
  return (
    <div className="mobileOnlyDisclaimer-wrapper">
      <div className="mobileOnlyDisclaimer">
        <h1>#VANLIFE</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="1024"
          viewBox="0 0 2048 2048"
        >
          <path
            fill="currentColor"
            d="M2048 2048h-129l-127-974q-3-26-10-52t-27-46l-447-444l33 398l88 88q43 43 88 89l-90 90l-370-369q-28-28-67-28q-19 0-36 7t-30 21t-20 30t-8 36q0 39 28 67l164 165v154q0 66 23 123t65 99t98 68t122 29v6q0 3-1 6q0 16 2 35t4 38t5 39t2 35q0 35-13 64t-36 51t-53 34t-65 13H155q-32 0-60-11t-50-31t-33-47t-12-61v-13q0-6 2-13L239 220q4-23 19-40t35-28t44-18t44-6h766q20 0 43 5t43 17t34 29t16 41l9 115l552 550q36 36 52 79t23 94zM1201 790l-44-533q-3-1-10-1H381q-5 0-9 1t-10 2L128 1764v6q0 11 8 16t19 6h1086q14 0 26-8t13-24q0-13-1-26t-3-27q-52-15-97-42t-84-64t-66-82t-46-96q-16-46-19-89t-4-89v-67l-127-126q-32-32-48-72t-17-86q0-46 17-86t48-71t70-47t87-18q37 0 65 9t53 25t46 37t47 47m-625 874v-128h256v128z"
          />
        </svg>
        <h3>Only mobile is supported on this website right now</h3>
        <p>
          Visit this website on a different device or change the screensize in
          the browser manually.
        </p>
      </div>
    </div>
  );
}