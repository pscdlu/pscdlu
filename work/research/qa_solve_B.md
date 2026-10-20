# QA solve B: chapters 4, 5, 6 (files 04_G4, 05_G35, 06a_G6a, 06b_G6b)

Method: each question solved blind (expert knowledge plus the section's own text), then compared with the `::answers` key. Every numeric item and every worked example and numeric statement in 6.2, 6.4, 6.5 and 6.7 (also 6.3, 6.6 and 6.9) recomputed with `python3 -I`. Files were read only, not edited.

Questions checked: 142 (ch 4: 46, ch 5: 29, ch 6 part a: 39, ch 6 part b: 28).
My blind answer matches the key on all 142. No match, sequence or multiple-select item has zero or more than one correct option. No key reason contradicts its section text. Every question is covered by its section (some only by the "Going Further" part, which is inside the section).

## Findings

| section | Q | key | your answer | problem | suggested fix (exact replacement text) |
|---|---|---|---|---|---|
| 6.5 | Q2 | (A) | (A) | The key's reason says option (D) "divides the raw score by the SD without subtracting the mean". That gives z = 58/4 = 14.5, but then T = 50 + 10 x 14.5 = 195, not 64.5. The distractor's T value matches no error path, so the reason does not fit option (D). | Replace option line `(D) 14.5 and 64.5` with `(D) 14.5 and 195` (the reason can stay as it is). |
| 6.2 | Q3 | (A) | (A), weakly | Possible ambiguity. R says reliability is "necessary but not sufficient". Only the "not sufficient" half explains A, and the "necessary" half has no bearing on it, so a careful candidate could argue for (B). The key agrees with the text (line 191), so this is low severity. | Replace `Reason (R): Reliability is necessary but not sufficient for validity.` with `Reason (R): Consistent scores do not by themselves show that a test measures what it is meant to measure.` |
| 6.2 (Going Further, "When split-half goes wrong") | numeric statement | n/a | n/a | "A computer simulation of 200 such students ... gave an odd-even correlation of 0.997" cannot be reproduced exactly, because it depends on the simulation's assumptions. My run (200 students reaching 20 to 50 items, all attempted items right) gave 0.994. The point stands (close to 1), but a three-decimal figure suggests more precision than the simulation has. | Replace `gave an odd-even correlation of 0.997.)` with `gave an odd-even correlation above 0.99.)` |
| 6.5 vs 6.8 | text, minor | n/a | n/a | The two sections define a percentile differently. 6.5 defines percentile rank as the percentage scoring **below**, while 6.8 defines the NTA percentile as the percentage scoring **at or below**. Both follow their sources (the textbook PR and the NTA definition), but a reader may see a contradiction. This is not a wrong number. | In 6.8, after `scored at or below that candidate.` add: ` (NTA counts candidates at or below; the textbook percentile rank of Section 6.5 counts only those below.)` |

## Numeric recomputation (all correct unless listed above)

- **6.2:**
  - Spearman-Brown: 1.40/1.70 = 0.82; 1.50/2.00 = 0.75; 0.60 becomes 0.75; Q1 1.60/1.80 = 0.89.
  - KR-21: 40/39 = 1.026, 384/1440 = 0.267, result 0.752, reported as 0.75.
  - KR-20 example: mean 2.5, variance 2.917, sum pq = 0.972, KR-20 = 0.83, KR-21 = 0.71.
  - SEM: 3, band 59 to 65, 95 per cent band 56.12 to 67.88; Q5 SEM = 4, band 46 to 54.
  - Validity ceilings: 0.90, 0.70, 0.60, 0.80.
  - Restriction of range: 0.90 and 0.60.
  - Speed test: 19 odd and 18 even items out of 37 is correct.
- **6.3:** 63/90 = 70 per cent; Q8 42/75 = 56 per cent.
- **6.4:**
  - Item analysis: FV/DI pairs 0.70/0.40, 0.50/-0.20, 0.95/0.03.
  - Distractor table: rows sum to 20 per group; FV 0.525, DI 0.45; 5 per cent of 40 = 2.
  - Maximum DI table: correct.
  - Correction for guessing: 45 and 40.
  - Chance scores: 20, 20, 15, and 10 vs 12.5.
  - 27 per cent groups: 54, 81, 108.
  - Q1: 0.40/0.40. Q4: 31.
- **6.5:**
  - Mean, median and mode: sum 210, mean 21, median 21, mode 15.
  - Second set: median 41. Third set: mean 52.4, median 47.
  - Variance and SD: variance 33.8, SD 5.81 (6.13 with N - 1).
  - Percentile ranks: 75 and 30.
  - z and T: 1.5/65, -1/40, 0/50; English 1.5 vs History 1.0.
  - Scaling example: correct.
  - Normal areas: 34.13, 68.27, 95.45, 99.73, 84.13, 2.28.
  - Correlation: r = 0.80, shared variance 0.64.
  - Q1: 8/7/7. Q2: 2.0/70.
- **6.6:** 8.4 x 9.5 = 79.8. The CBSE nine-point bands are correct.
- **6.7:**
  - Credits: 3 + 1 = 4; NCrF 1200/30 = 40.
  - SGPA: UGC SGPA 139/20 = 6.95; 119/16 = 7.4375 (simple mean 7.2); equal-credit case 7.5.
  - CGPA: UGC CGPA 969.4/144 = 6.73; 493.6/66 = 7.48 (simple mean 7.5).
  - Failed courses: F case 80/14 = 5.71 (80/10 = 8.0); clearing F 6.17 to 6.83, a rise of 0.67.
  - Target problems: 7.8; fifth course 7 = B+.
  - Q2 89/12 = 7.42; Q3 278/40 = 6.95; Q4 252/30 = 8.4; Q5 5 credits.
- **6.9:** weighted rubric 3.0 = 75 per cent (unweighted 83.3); Q4 2.9/4 = 72.5 per cent; group marks 90/80/70/40 (group average 3.5).
- **4.6:** worked completion rates 6, 30 and 20 per cent; Q6 20 per cent.
