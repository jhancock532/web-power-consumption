# Energy usage of creative web assets

This repository contains example webpages to test browser energy usage with. The testing method outlined below is supported on MacOS devices using the M series chips.

For consistency:

- Ensure that any non-essential processes are stopped on your device. 
- Use an incognito tab of your chosen browser without any extensions installed.
- Make sure the browser renders at the same size for all tests (fullscreen or 1440 x 900).
- For testing video embeds I pressed play then waited five seconds before recording energy usage. This results in a lower energy usage reading than when including the setup and download of the embed itself.
- Disable live captions in Chrome, which can effect video playback - chrome://settings/accessibility

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
