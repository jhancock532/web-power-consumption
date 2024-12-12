# Energy usage of creative web assets

This repository contains example webpages to test browser energy usage with. The testing method outlined below is supported on MacOS devices using the M series chips.

When testing, ensure that any non-essential processes are stopped, as these could affect the energy usage results.

For consistency:

- Use an incognito tab of your chosen browser without any extensions installed.
- Make sure the browser renders at the same size for all tests (fullscreen or 1440 x 900).
- For testing video embeds I pressed play then waited five seconds before recording energy usage.
- Disable live captions in Chrome - chrome://settings/accessibility

## Testing with powermetrics

To get average energy usage over a long period of time (ten seconds), we can use the following command:

```bash
sudo powermetrics –samplers tasks –show-process-coalition –show-process-gpu -n 1 -i 10000
```

While testing, I took three readings for each test webpage of 10 seconds, then took the median value of the resulting CPU, GPU and total energy usage readings. The command I used to do this was as follows:

```bash
sudo powermetrics --samplers cpu_power -n 3 -i 10000
```

For logging at regular intervals, to get a more granular view of how the energy usage changes over time, you can use the following command:

```bash
script -q output.txt bash -c "sudo powermetrics --samplers cpu_power --show-process-gpu -i 100 | perl -ne 'print if /Power:/'"
```

This output can then be parsed with a script into a more usable format. Consider asking your favourite LLM to generate this script for you (an example is provided in the `scripts` directory).

## Improvements

- Test against an identical video file uploaded to Vimeo and YouTube for consistency.
- Create a test webpage for a video streaming service that advocates itself as highly optimised, to see how much of an improvement it offers to standard video embeds.
