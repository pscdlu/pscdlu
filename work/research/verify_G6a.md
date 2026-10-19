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

## Sections 6.3-6.5
| fact as printed | source 1 (URL) | source 2 or "primary" | date checked |
|---|---|---|---|
| Michael Scriven introduced formative/summative, 1967, "The methodology of evaluation", for curriculum/programme evaluation (in Tyler, Gagné, Scriven eds., Perspectives of Curriculum Evaluation) | https://journals.flvc.org/fjer/article/download/133916/137893/246897 | https://jmde.journals.publicknowledgeproject.org/index.php/jmde_1/article/view/353 ; https://www.evalcommunity.com/career-center/formative-evaluation-versus-summative-evaluation/ | 2026-10-19 |
| Bloom, Hastings and Madaus (1971), Handbook on Formative and Summative Evaluation of Student Learning; applied to student learning; formative tests after learning units (mastery learning) | https://eera-ecer.de/ecer-programmes/conference/22/contribution/41939 | https://matdisc.unitech.ac.pg/Record/00228087 (catalogue: New York, McGraw-Hill, 1971) | 2026-10-19 |
| Robert Glaser, 1963, American Psychologist 18, 519-521, introduced criterion-referenced (vs norm-referenced) measurement; article on instructional technology and measurement of learning outcomes | https://link.springer.com/10.1007/978-3-030-56596-1_2 | https://ascd.org/el/articles/criterion-referenced-measurement-half-a-century-wasted ; https://files.ascd.org/staticfiles/ascd/pdf/journals/ed_lead/el_197302_dziuban.pdf (first name "Robert" from booklet and standard texts; snippet did not print it) | 2026-10-19 |
| Gronlund: formative = "first aid" for simple learning problems; diagnostic = search for underlying causes of problems that do not respond to first aid | https://distanceeducationju.in/pdf/B.Ed.%20C.%20No%20302%20(Theory%20)%20ii.pdf (University of Jammu B.Ed. text) | booklet S12-Q10; printed as "as Indian B.Ed. texts quote him" | 2026-10-19 |
| Placement, formative, diagnostic, summative typology (Airasian; Gronlund; Bloom, Hastings, Madaus) | https://elearning.univ-bejaia.dz/mod/resource/view.php?id=372258 | https://www.erc.ie/wp-content/uploads/2025/08/vol02chp8.pdf | 2026-10-19 |
| Lorna Earl, Assessment as Learning (Corwin, 2003): assessment of, for, as learning | https://www.sagepub.com/books/Book220774 | https://www.edcan.ca/?p=42348 | 2026-10-19 |
| Angoff (1971): judges estimate probability that a minimally competent candidate answers each item correctly; summed and averaged to give cut score | https://methods.sagepub.com/ency/edvol/embed/sage-encyclopedia-of-educational-research-measurement-evaluation/chpt/angoff-method | https://nabp.pharmacy/news/blog/rigorous-process-to-set-exam-passing-standard-shows-its-more-than-just-a-number/ | 2026-10-19 |
| Direct vs indirect assessment (outcome-based education; course-exit, alumni, employer surveys indirect) | booklet S17-Q6 (claim); not web-verified (search budget exhausted) | taught as general concept without attribution; see conflicts | 2026-10-19 |
| Kelley, T. L. (1939), "The selection of upper and lower groups for the validation of test items", J. Educ. Psychol. 30, 17-24; 27 per cent groups | https://www.cambridge.org/core/journals/psychometrika/article/abs/note-on-use-of-extreme-criterion-groups-in-item-discrimination-analysis/F4AB8340F2323216EA477093AE5E260A | https://metricgate.com/docs/discrimination-index-item-analysis/ ; https://www.questionmark.com/?p=1027 | 2026-10-19 |
| Ebel discrimination bands: >=0.40 very good; 0.30-0.39 reasonably good; 0.20-0.29 marginal; <=0.19 poor | https://www.slideshare.net/slideshow/item-analysis-32347588/32347588 (cites Ebel 1972 p. 399) | https://so05.tci-thaijo.org/index.php/JSSRA/article/download/24406/20772 ; https://survey.amu.edu.et/ojs/index.php/AMUJCLS/article/download/435/197 | 2026-10-19 |
| Non-functional distractor: chosen by < 5% of examinees (Haladyna and Downing, 1993) | https://pmc.ncbi.nlm.nih.gov/articles/PMC4923093 | https://link.springer.com/article/10.1186/1472-6920-9-40 | 2026-10-19 |
| Correction for guessing S = R - W/(n-1); omitted items neither right nor wrong | https://ncme.org/wp-content/uploads/2025/10/Module-4-Formula-Scoring-of-Multiple-choice-Tests-1.pdf | https://www.academia.edu/80474467/Multiple_Choice_Tests | 2026-10-19 |
| S. S. Stevens (1946), "On the theory of scales of measurement", Science 103, 677-680; nominal, ordinal, interval, ratio | https://courses.ie.bilkent.edu.tr/wp-content/uploads/sites/13/2023/03/On_the_Theory_of_Scales_of_Measurement.pdf | https://en.wikipedia.org/wiki/Level_of_measurement (search summary) | 2026-10-19 |
| Normal curve areas 68/95/99.7 (exact 68.27, 95.45, 99.73; 34.13 mean to 1 SD) | https://digfir-published.macmillanusa.com/scc9e/scc9e_ch113_5.html | Python computation with math.erf (below) | 2026-10-19 |
| z = (X - mean)/SD; T = 50 + 10z | definitions; booklet S18-Q18; https://opentextbc.ca/businesstechnicalmath/chapter/8-4-z-scores/ (z only) | T-score definition not separately web-checked (budget exhausted); arithmetic checked in Python | 2026-10-19 |
| IQ mean 100, SD 15 | used only as given data in a worked example ("Suppose ..."), not asserted as fact | n/a | 2026-10-19 |

## Python computations, sections 6.3-6.5
| computation | result printed |
|---|---|
| 63/90 x 100 ; 42/75 x 100 | 70.0 ; 56.0 |
| 64-27 and 52-18 (true answers for systematic-error example) | 37 ; 34 (student's 43 and 46 come from smaller-from-larger digit) |
| FV (27+15)/60 ; DI (27-15)/30 | 0.7 ; 0.4 |
| FV (12+18)/60 ; DI (12-18)/30 | 0.5 ; -0.2 |
| FV 57/60 ; DI 1/30 | 0.95 ; 0.0333 |
| 12/60 (slip) | 0.2 |
| 0.27 x 200, 300, 400 | 54, 81, 108 |
| max DI = 2 min(p, 1-p) for p = 0.1, 0.3, 0.5, 0.7, 0.9, 1.0 | 0.2, 0.6, 1.0, 0.6, 0.2, 0.0 |
| Distractor table: upper A15 B0 C1 D4; lower A6 B1 C10 D3; totals 21, 1, 11, 7; per cent of 40 | 52.5, 2.5, 27.5, 17.5; FV 0.525; DI 0.45; 5% of 40 = 2 |
| 50 - 20/4 ; 60 - 20/1 ; 36 - 15/3 | 45 ; 40 ; 31 |
| Chance: 100/5, 40/2, 60/4 | 20, 20, 15 |
| Check 6.4 Q1: 32/80 ; 16/40 | 0.4 ; 0.4 |
| Scores 12,15,15,18,20,22,24,25,28,31: sum, mean, median, mode, sum sq dev, pvariance, pSD, sample SD | 210, 21, 21, 15, 338, 33.8, 5.8138, 6.1283 |
| 28,34,39,41,45,47,50 median | 41 |
| 40,42,45,47,48,50,95 mean, median | 52.43 (367/7), 47 |
| PR 30/40, 18/60 | 75, 30 |
| z/T for mean 60 SD 8: X = 72, 52, 60 | 1.5/65 ; -1/40 ; 0/50 |
| (72-66)/4 ; (80-70)/10 | 1.5 ; 1.0 |
| Examiners: P zA 1.0 zB 0 sum 1.0 (raw 125); Q zA -1 zB 1 sum 0 (raw 130) | as printed |
| Normal: within 1, 2, 3 SD; mean to 1 SD; below +1; beyond +2 | 68.27, 95.45, 99.73; 34.13; 84.13; 2.28 |
| Correlation X 1-5, Y 2,4,3,6,5: sum dxdy 8, sum dx2 10, sum dy2 10, r, r2 | 8, 10, 10, 0.8, 0.64 |
| r2 for 0.6, 0.5, 0.7, -0.6 | 0.36, 0.25, 0.49, 0.36 |
| 6.5 check Q1: 4,7,7,9,13 mean/median/mode | 8, 7, 7 |
| 6.5 check Q2: (58-50)/4 ; 50 + 10 x 2 | 2.0 ; 70 |
