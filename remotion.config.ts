import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('png'); // lossless intermediate frames for max quality
Config.setOverwriteOutput(true);
Config.setEntryPoint('src/index.ts');
