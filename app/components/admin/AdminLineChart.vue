<script setup lang="ts">
const props = withDefaults(defineProps<{
  labels: string[];
  values: number[];
  format?: (value: number) => string;
  color?: string;
  height?: number;
}>(), {
  format: (value: number) => String(Math.round(value)),
  color: "var(--chart-accent)",
  height: 220,
});

// Round ticks (1/2/2.5/5 x 10^n) whose top sits above the largest value, same rule as references/app-screens.md §6.3.
function ticks(min: number, max: number, count = 4) {
  if (max === min)
    max = min + 1;
  const raw = (max - min) / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) ?? 10 * mag;
  const lo = Math.floor(min / step) * step;
  let hi = Math.ceil(max / step) * step;
  if (hi <= max)
    hi += step;
  const out: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}

const width = 720;
const padLeft = 44;
const padRight = 8;
const padTop = 10;
const padBottom = 22;

const plotW = width - padLeft - padRight;
const plotH = computed(() => props.height - padTop - padBottom);

const yTicks = computed(() => ticks(0, Math.max(...props.values, 1)));
const yMax = computed(() => yTicks.value[yTicks.value.length - 1]);

function xAt(i: number) {
  return padLeft + (props.labels.length <= 1 ? 0 : (i / (props.labels.length - 1)) * plotW);
}
function yAt(v: number) {
  return padTop + plotH.value - (v / yMax.value) * plotH.value;
}

const linePath = computed(() => props.values.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" "));

const points = computed(() => props.values.map((v, i) => ({ x: xAt(i), y: yAt(v), label: props.labels[i], value: v })));
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    :aria-label="`Line chart from ${labels[0]} to ${labels[labels.length - 1]}, ending at ${format(values[values.length - 1])}`"
    class="w-full block"
    style="height: auto;"
  >
    <g v-for="t in yTicks" :key="t">
      <line
        :x1="padLeft"
        :x2="width - padRight"
        :y1="yAt(t)"
        :y2="yAt(t)"
        stroke="var(--ui-border)"
        stroke-width="1"
      />
      <text
        :x="padLeft - 8"
        :y="yAt(t)"
        text-anchor="end"
        dominant-baseline="middle"
        font-size="9"
        fill="var(--ui-text-muted)"
      >
        {{ format(t) }}
      </text>
    </g>

    <path
      :d="linePath"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <g v-for="(p, i) in points" :key="i">
      <circle
        v-if="i === points.length - 1"
        :cx="p.x"
        :cy="p.y"
        r="3"
        :fill="color"
      />
      <title>{{ p.label }}: {{ format(p.value) }}</title>
    </g>

    <text
      v-for="(label, i) in labels"
      :key="label"
      :x="xAt(i)"
      :y="height - 4"
      text-anchor="middle"
      font-size="9"
      fill="var(--ui-text-muted)"
    >
      {{ label }}
    </text>
  </svg>
</template>
