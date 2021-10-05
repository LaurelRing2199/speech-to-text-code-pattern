/* eslint-disable no-undef */
jest.setTimeout(10000);

describe('Input methods', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  });

  it('File upload', async () => {
    await page.waitFor('div.bx--dropdown', {
      timeout: 0,
    });

    // Choose language model.
    await expect(page).toClick('div.bx--dropdown');
    await expect(page).toClick('div.bx--list-box__menu-item__option', {
      text: 'Japanese (16khz Broadband)',
    });

    // Upload file.
    await expect(page).toUploadFile(
      'input.bx--visually-hidden',
      'public/audio/ja-JP_Broadband-sample.wav',
    );

    // Wait for the audio to play for a bit.
    await page.waitFor(5000);

    // Assert that some transcript text has shown up.
    const transcriptBox = await page.$('div.transcript-box');
    const text = await transcriptBox.getProperty('textContent');
    expect(text).toBeTruthy();
  });
});
