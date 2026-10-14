I worked on autonomous drones with my team in Georgia Tech's Vertically Integrated Projects (VIP) program. In Spring 2026 our focus was maritime search and rescue: spotting swimmers, boats, buoys, and jet skis in drone imagery, using a detection model running on an NVIDIA Jetson.

## Overview

The project had two phases:

- **Fall 2025:** flight control with DroneKit. The team had a detection loop that flies the drone toward a detected fire, and a simulated lawnmower-pattern search with a live web dashboard.
- **Spring 2026:** maritime search and rescue. The team trained an RT-DETR object detector and got it running on a Jetson. Inference runs entirely on the device, with no network connection needed.

## My role

In Spring 2026 I set up the team's repository. I also wrote the script we used to benchmark the model on the Jetson and the startup guide for running the Jetson during demos. Teammates contributed the dataset tooling: one wrote an image-augmentation and class-balancing script, and another added a thermal-camera dataset labelled for detecting people.

## What I built

**Jetson inference benchmark.** This Jupyter notebook loads our trained RT-DETR model (through Ultralytics) on the Jetson's GPU and runs it over four test sets of images. For each set it reports milliseconds per image, frames per second, and how many swimmers, boats, buoys, and jet skis it found. It ends with a summary table across all four sets and an overall FPS. To keep the numbers fair and the run fast, it:

- runs a warmup pass before timing, because the first inference is always slow while CUDA starts up;
- uses FP16 (half-precision) inference, which is faster on the Jetson Orin's GPU;
- streams results one image at a time instead of holding every prediction in memory, and writes nothing to disk.

**Demo runbook.** I wrote the README's startup guide for live demos. It covers powering the Jetson and connecting it to a laptop over USB-C, starting JupyterLab on the Jetson over SSH, and tunnelling it to the laptop's browser. It also lists where the model weights, test images, and inference results live on the device.

## How it works

In Spring 2026, images go into a transformer-based object detector (RT-DETR) at a 640-pixel input size, running on the Jetson's GPU. The detector reports swimmers, boats, buoys, and jet skis, at a confidence threshold of 0.15. The team's augmentation script expands a dataset with rotated and flipped copies, and it can balance classes by generating extra examples of under-represented ones.

The Fall 2025 work worked like this:

- **Detection loop.** It repeatedly estimates the fire's GPS position from what the camera sees and flies 75% of the way toward that estimate. Once the estimate moves less than 2 metres between readings, it flies to the target.
- **Simulated search.** The drone flies a lawnmower pattern over a set area in the DroneKit SITL simulator. A Flask dashboard shows its live position on an OpenStreetMap map, along with the planned waypoints, telemetry, detection alerts, and a log of mission events.

## Tech stack

- Python
- Ultralytics RT-DETR, PyTorch (CUDA, FP16)
- NVIDIA Jetson, JupyterLab
- OpenCV (data augmentation)
- DroneKit, DroneKit SITL, Flask (Fall 2025)

## Outcome

By the end of Spring 2026, the detector was running on the Jetson for live demos, and the benchmark notebook gave frame-rate and detection counts for every test set.
