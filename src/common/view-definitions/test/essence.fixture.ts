/*
 * Copyright 2017-2018 Allegro.pl
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
 */

import { day, Duration, Timezone } from "chronoshift";
import { OrderedSet } from "immutable";
import { MANIFESTS } from "../../manifests";
import { TOTALS_MANIFEST } from "../../manifests/totals/totals";
import { Essence, EssenceValue } from "../../models/essence/essence";
import { RelativeTimeFilterClause, TimeFilterPeriod } from "../../models/filter-clause/filter-clause";
import { Filter } from "../../models/filter/filter";
import { SeriesList } from "../../models/series-list/series-list";
import { Splits } from "../../models/splits/splits";
import { TimeShift } from "../../models/time-shift/time-shift";
import { dataCube } from "./data-cube.fixture";
import { count, sum } from "./measure";

type EssenceKeys
  = "visualization"
  | "timezone"
  | "filter"
  | "splits"
  | "series"
  | "pinnedDimensions"
  | "pinnedSort"
  | "colors"
  | "highlight"
  | "timeShift";

type EssenceOptions = Pick<EssenceValue, EssenceKeys>;

const defaults: EssenceOptions = {
  filter: Filter.fromClause(new RelativeTimeFilterClause({
    reference: "time",
    duration: Duration.fromCanonicalLength(day.canonicalLength),
    period: TimeFilterPeriod.PREVIOUS
  })),
  series: SeriesList.fromMeasures([count, sum]),
  splits: Splits.fromSplits([]),
  colors: null,
  highlight: null,
  pinnedDimensions: OrderedSet(["string_a"]),
  pinnedSort: "count",
  timeShift: TimeShift.empty(),
  timezone: Timezone.UTC,
  visualization: TOTALS_MANIFEST
};

export function mockEssence(opts: Partial<EssenceOptions> = {}) {
  return new Essence({
    dataCube,
    visualizations: MANIFESTS,
    ...defaults,
    ...opts
  });
}
