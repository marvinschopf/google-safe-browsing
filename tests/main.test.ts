/**
 * Copyright (C) 2021 Marvin Schopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @license Apache-2.0
 * @copyright 2021 Marvin Schopf
 * @author Marvin Schopf <marvin@schopf.biz>
 *
 */

import test, { ExecutionContext } from "ava";
import { GoogleSafeBrowsingClient } from "./../src/index";

const GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY
	? process.env.GOOGLE_API_KEY
	: "";

const UNSAFE_URL_1: string = process.env.UNSAFE_URL_1
	? process.env.UNSAFE_URL_1
	: "";

test("isUrlSafe", async (t: ExecutionContext) => {
	const client: GoogleSafeBrowsingClient = new GoogleSafeBrowsingClient(
		GOOGLE_API_KEY
	);
	t.is(await client.isUrlSafe("example.com"), true);
	t.is(await client.isUrlSafe("marvinschopf.com"), true);
	t.is(await client.isUrlSafe(UNSAFE_URL_1), false);
});
