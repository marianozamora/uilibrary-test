export type AssetType = 'kpi' | 'layout' | 'dataviz' | 'storyboard'

export interface Asset {
  id: number
  name: string
  type: AssetType
  tags: string[]
  date: string
  featured: boolean
  trending: boolean
  affiliate: boolean
  afName?: string
  desc: string
  bq?: string[]
  metricIds?: string[]
  calc?: string
  visuals?: boolean
  pages?: number
  kpisUsed?: string[]
  chartType?: string
  kpisFavs?: string[]
  kpis?: string[]
  affiliates?: string[]
}

export const ASSETS: Asset[] = [
  { id:1, name:'Revenue Growth KPI', type:'kpi', tags:['finance','growth','mrr'], date:'07/12/2024',
    featured:true, trending:false, affiliate:true, afName:'Acme Corp',
    desc:'Month-over-month revenue performance tracker across all business units.',
    bq:['Is revenue growth on track vs targets?','What drove the delta vs last month?','Which segment is underperforming?'],
    metricIds:['net_revenue','mom_growth_pct','ytd_total'],
    calc:'SUM(Revenue) / LAG(SUM(Revenue), 1) - 1', visuals:true },
  { id:2, name:'Customer Churn Rate', type:'kpi', tags:['retention','cx','churn'], date:'06/28/2024',
    featured:true, trending:false, affiliate:false,
    desc:'Tracks customer retention and churn segmented by cohort and region.',
    bq:['Where is churn highest across segments?','Which cohorts are most at risk?'],
    metricIds:['churn_rate','retained_customers','lost_mrr'],
    calc:'Lost Customers / Customers at Period Start', visuals:false },
  { id:3, name:'Net Promoter Score', type:'kpi', tags:['cx','nps','loyalty'], date:'07/15/2024',
    featured:false, trending:true, affiliate:true, afName:'RetailCo',
    desc:'NPS trend analysis with promoter, detractor, and passive breakdown.',
    bq:['How is NPS trending quarter-over-quarter?','Which touchpoints drive detractors?'],
    metricIds:['nps_score','promoters_pct','detractors_pct'],
    calc:'(Promoters − Detractors) / Total Respondents × 100', visuals:true },
  { id:4, name:'Pipeline Conversion', type:'kpi', tags:['sales','pipeline','funnel'], date:'06/15/2024',
    featured:false, trending:true, affiliate:false,
    desc:'Sales funnel conversion from lead to close by stage and rep.',
    bq:['Where is the funnel leaking most?','Which reps have highest close rates?'],
    metricIds:['pipeline_value','stage_conversion','acv'],
    calc:'Closed Won / Total Opportunities Entered Stage', visuals:true },
  { id:5, name:'Q3 Executive Dashboard', type:'layout', tags:['q3','exec','quarterly'], date:'07/23/2024',
    featured:true, trending:false, affiliate:false,
    desc:'Full executive summary layout for quarterly business review.',
    pages:6, kpisUsed:['Net Revenue','NPS','Churn Rate','Pipeline'] },
  { id:6, name:'Regional Sales Layout', type:'layout', tags:['sales','regional','territory'], date:'07/01/2024',
    featured:false, trending:true, affiliate:false,
    desc:'Breakdown of sales performance by region, territory, and team.',
    pages:4, kpisUsed:['Pipeline Value','Closed Won','ACV'] },
  { id:7, name:'Revenue Waterfall', type:'dataviz', tags:['finance','waterfall','revenue'], date:'07/08/2024',
    featured:true, trending:true, affiliate:true, afName:'Acme Corp',
    desc:'Visual breakdown of revenue by segment, showing additions and losses.',
    chartType:'Waterfall chart', kpisFavs:['Net Revenue','MoM Growth %'] },
  { id:8, name:'Cohort Retention Grid', type:'dataviz', tags:['retention','cohort','heatmap'], date:'06/22/2024',
    featured:false, trending:true, affiliate:false,
    desc:'Monthly cohort retention heatmap to identify drop-off patterns.',
    chartType:'Heatmap', kpisFavs:['Churn Rate','Retained Customers'] },
  { id:9, name:'Market Expansion Story', type:'storyboard', tags:['strategy','growth','expansion'], date:'07/20/2024',
    featured:true, trending:false, affiliate:true, afName:'GlobalBrand',
    desc:'Strategic narrative for new market entry with supporting data points.',
    kpis:['TAM','Market Share %','Unit Economics'], affiliates:['GlobalBrand','Acme Corp'] },
  { id:10, name:'Product Launch Deck', type:'storyboard', tags:['product','gtm','launch'], date:'07/05/2024',
    featured:false, trending:true, affiliate:false,
    desc:'Go-to-market storytelling framework for new product releases.',
    kpis:['Adoption Rate','Feature Uptake','ARR Impact'], affiliates:[] },
]
