# puppeteer-csv-downloader

## Project Description

This project is a Puppeteer-based script designed to automate the process of downloading CSV files from Solscan. This script helps users to easily download transaction data in CSV format.

## Purpose

The purpose of this project is to provide a simple and automated way to download transaction data from Solscan, which can be useful for data analysis, record-keeping, and other purposes.

## Required Configuration

Before running the script, you need to configure the following parameters in the `config.json` file:

- `account`: The Solana account address you want to fetch data for.
- `flow`: The flow direction of the transactions (e.g., "out").
- `token_address`: The token address you want to fetch data for.

Example `config.json`:

```json
{
  "account": "AaZkwhkiDStDcgrU37XAj9fpNLrD8Erz5PNkdm4k5hjy",
  "flow": "out",
  "token_address": "So11111111111111111111111111111111111111111"
}
```

## Usage Instructions

1. Clone the repository:

```sh
git clone https://github.com/scott1991/puppeteer-csv-downloader.git
cd puppeteer-csv-downloader
```

2. Install the dependencies:

```sh
npm install
```

3. Configure the `config.json` file with your desired parameters.

4. Run the script:

```sh
node index.js
```

## Example

To download transaction data for a specific Solana account, configure the `config.json` file as follows:

```json
{
  "account": "AaZkwhkiDStDcgrU37XAj9fpNLrD8Erz5PNkdm4k5hjy",
  "flow": "out",
  "token_address": "So11111111111111111111111111111111111111111"
}
```

Then, run the script:

```sh
node index.js
```

The CSV file will be downloaded to the `downloaded_csv` folder.

## Dependencies

This project requires the following dependencies:

- `puppeteer`: A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

To install the dependencies, run:

```sh
npm install
```

