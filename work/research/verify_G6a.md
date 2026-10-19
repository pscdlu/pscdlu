# Verification log: G6a (sections 6.1-6.5)
Note: the shared WebSearch budget for the session ran out part-way through this group's checking, and WebFetch could not reach any host (proxy refused; DNS failure). Facts that could not be checked were left out or recorded in conflicts_G6a.md. Primary sources (NTA, UGC) could not be fetched (proxy 403 for ugc.gov.in, ugc.ac.in; DNS failure for ugcnet.nta.ac.in).

| fact as printed | source 1 (URL) | source 2 or "primary" | date checked |
|---|---|---|---|
| Syllabus line: "Evaluation Systems: Elements and Types of evaluation, Evaluation in Choice Based Credit System in Higher education, Computer based testing, Innovations in evaluation systems." | https://www.drishtiteachingexams.com/blog/ugc-net-paper-i-syllabus-section-wise-topics-&-study-plan | https://professoracademy.com/wp-content/uploads/2023/04/NTA-UGC-NET-JRF-English-SYLLABUS.pdf (reproduction of NTA syllabus); also project file src/outline_draft.md line 9. Primary NTA PDF unreachable. | 2026-10-19 |
| Gronlund: evaluation = quantitative description (measurement) + qualitative description (non-measurement) + value judgements; printed as "Indian textbooks attribute to Norman E. Gronlund" | https://www.slideshare.net/slideshow/ppt-on-educational-measurement-and-evaluation/239884055 | https://www.slideshare.net/slideshow/educational-evaluation-a-brief-conceptual-overview/249550488 ; author name Norman E. Gronlund from catalogue https://nieropac.nier.go.jp/opac/opac_link/bibid/BB00044738 (attribution secondary only; see conflicts) | 2026-10-19 |
| Ralph W. Tyler, Basic Principles of Curriculum and Instruction (1949); four questions (purposes, learning experiences, organisation, evaluation) | https://sk.sagepub.com/ency/edvol/embed/curriculumstudies/chpt/basic-principles-curriculum-instruction | https://ascd.org/blogs/curriculum-development-what-would-tyler-do | 2026-10-19 |
| Evaluation triangle: objectives, learning experiences, evaluation (Tyler basis; Indian textbook diagram) | https://sk.sagepub.com/ency/edvol/embed/evaluation/chpt/tyler-ralph-w | booklet S12-Q25 explanation; Indian B.Ed. texts (triangle diagram not found on web as such; printed as "Indian textbooks draw this as") | 2026-10-19 |
| Functions of evaluation: instructional, administrative, guidance, research ("four are commonly listed") | booklet S14-Q10 (claim); standard B.Ed. textbooks | not independently web-verified (budget exhausted); presented as "commonly listed" | 2026-10-19 |
| obtained score = true score + error (classical test theory) | https://bookdown.org/sz_psyc490/r4psychometics/reliability.html | https://stats.libretexts.org/Bookshelves/Introductory_Statistics/Introductory_Statistics_(Lane)/06%3A_Research_Design/6.02%3A_Measurement | 2026-10-19 |
| CIPP: Daniel Stufflebeam; Context, Input, Process, Product; decision-oriented; developed in the 1960s (1966 most cited) | https://sk.sagepub.com/ency/edvol/embed/evaluation/chpt/cipp-model-context-input-process-product | https://www.socialsciencespace.com/2017/08/parent-evaluation-daniel-stufflebeam-1936-2017/ ; https://www.guilford.com/books/The-CIPP-Evaluation-Model/Stufflebeam-Zhang/9781462529230/print | 2026-10-19 |
| Validity is the most important quality; reliability necessary but not sufficient | https://en.wikiversity.org/wiki/Reliability_and_validity | https://socialworlds.sgh.waw.pl/node/189 | 2026-10-19 |
| Spearman-Brown: Charles Spearman and William Brown, separate papers, 1910, British Journal of Psychology vol. 3; predicts reliability with change of length | https://methods.sagepub.com/ency/edvol/embed/encyc-of-research-design/chpt/spearman-brown-prophecy-formula | https://en.wikipedia.org/wiki/Spearman%E2%80%93Brown_prediction_formula (search summary) | 2026-10-19 |
| Spearman-Brown forms 2r/(1+r) and nr/(1+(n-1)r) | standard form; search summary of Wikipedia; https://search.r-project.org/CRAN/refmans/CTT/html/spearman.brown.html | booklet S19-Q19 consistent; checked numerically in Python | 2026-10-19 |
| Kuder, G. F. and Richardson, M. W. (1937), Psychometrika 2(3) 151-160; KR-20, KR-21 for items scored 1/0; KR-21 assumes equal difficulty, is <= KR-20 | https://en.wikipedia.org/wiki/Kuder%E2%80%93Richardson_formulas (search summary) | https://www.cs.cas.cz/martinkova/documents/posterIMPS2013.pdf | 2026-10-19 |
| KR-20 = k/(k-1)(1 - sum pq / s^2); KR-21 = k/(k-1)(1 - M(k-M)/(k s^2)) | https://metricgate.com/docs/kr-21-reliability/ | https://methods.sagepub.com/ency/edvol/embed/the-sage-encyclopedia-of-communication-research-methods/chpt/reliability-kuderrichardson-formula | 2026-10-19 |
| KR-20 is a special case of Cronbach's alpha | https://en.wikipedia.org/wiki/Kuder%E2%80%93Richardson_formulas (search summary) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8451024 (search result) | 2026-10-19 |
| SEM = SD x sqrt(1 - r); X +/- 1 SEM ~68%, +/- 1.96 SEM ~95%; band around obtained score | https://csus.edu/indiv/b/brocks/courses/eds%20245/PowerPoint/PDFs/Lecture%2012.Test%20Validity.pdf | https://assess.com/confidence-interval/ ; https://rdrr.io/cran/psychometric/man/SE.Meas.html | 2026-10-19 |
| Maximum validity = sqrt(reliability) (index of reliability) | https://en.wikiversity.org/wiki/Reliability_and_validity | https://socialworlds.sgh.waw.pl/node/189 | 2026-10-19 |
| Split-half spuriously high on speed tests; use test-retest or parallel forms | standard textbook position (Anastasi); search returned partial support only (https://assess.com/split-half-reliability/) | Python simulation in this log (odd-even r = 0.9965 on simulated pure speed test) | 2026-10-19 |
| Messick (1989): construct under-representation and construct-irrelevant variance | https://rasch.org/rmt/rmt221a.htm | https://www.ets.org/research/policy_research_reports/publications/report/1992/hxiv.html ; https://evidencebased.education/?p=595 | 2026-10-19 |
| Reliability depends on score variance (restriction of range); reliability = 1 - error var / total var | https://bookdown.org/sz_psyc490/r4psychometics/reliability.html | booklet S20-Q44; Python computation below | 2026-10-19 |

## Python computations (python3 -I)
| computation | result printed |
|---|---|
| Spearman-Brown 2(0.70)/(1.70) | 0.8235 -> 0.82 |
| Spearman-Brown n=3, r=0.50 | 0.75 |
| Spearman-Brown r=0.80 | 0.8889 -> 0.89 (check Q1) |
| Spearman-Brown r=0.60 (booklet S19-Q19) | 0.75 |
| KR-21 k=40, M=24, s=6 | 0.7521 -> 0.75; 40/39 = 1.026; 384/1440 = 0.267 |
| KR-20, 6 students x 5 items (totals 5,4,3,2,1,0), pvariance 2.9167, sum pq 0.9722 | 0.8333 -> 0.83 ; KR-21 same data 0.7143 -> 0.71 |
| SEM 10 x sqrt(0.09) | 3.0 ; 1.96 x 3 = 5.88 |
| SEM 8 x sqrt(0.25) | 4.0 (check Q5) |
| sqrt(0.81), sqrt(0.64), sqrt(0.49), sqrt(0.36) | 0.9, 0.8, 0.7, 0.6 |
| 1 - 9/90 ; 1 - 9/22.5 | 0.90 ; 0.60 |
| Simulated speed test, 200 students reaching 20-60 items, odd vs even half scores | r = 0.9965 |
